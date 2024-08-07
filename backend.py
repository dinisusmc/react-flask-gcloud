from flask import Flask, request, url_for, jsonify
import json
from sqlalchemy import create_engine, text
import pandas as pd
from flask_cors import CORS



DATABASE = 'todolist.db'

user = "postgres"
passw = "password"
host = "localhost:5432"
db_name = "todolist"

app = Flask(__name__)
CORS(app)

@app.route("/api/items", methods=['GET', 'OPTIONS'])
def show_list():
    conn = get_db()
    query = '''
SELECT tasks.*, users.last_name, users.first_name FROM tasks
LEFT JOIN users 
   ON tasks.id = CAST(users.uid AS varchar);
'''
    entries = pd.read_sql(text(query), conn)
    tdlist = [{x[0]:x[1] for x in zip(entries.columns, i)} for i in entries.values]
    conn.close()
    return jsonify(tdlist), 201

@app.route("/api/users", methods=['GET', 'OPTIONS'])
def show_users():
    conn = get_db()
    query = 'SELECT * FROM users;'
    entries = pd.read_sql(text(query), conn)
    tdlist = [{x[0]:x[1] for x in zip(entries.columns, i)} for i in entries.values]
    conn.close()
    return jsonify(tdlist), 201

@app.route("/api/add", methods=['POST'])
def add_entry():
    db = get_db()
    print("post received")
    data = json.loads(request.data.decode('utf-8'))
    
    query = f"insert into tasks (id, what_to_do, due_date) values ('{data['id']}', '{data['whatToDo']}', '{data['dueDate']}');"
    query = query.replace(", due_date", "").replace(", ''", "") if ", ''" in query else query

    db.execute(text(query))
    db.commit()
    db.close()
    return "", 201

@app.route("/api/add/user", methods=['POST'])
def add_user():
    db = get_db()
    print("post received")
    data = json.loads(request.data.decode('utf-8'))
    
    query = f"insert into users (first_name, last_name) values ('{data['first_name']}', '{data['last_name']}');"

    db.execute(text(query))
    db.commit()
    db.close()
    return "", 201

@app.route("/api/delete/<item>/<uid>", methods=['GET', 'OPTIONS'])
def delete_entry(item, uid):
    print("received")
    db = get_db()
    db.execute(text("DELETE FROM tasks WHERE what_to_do='"+item+"' AND id='" +uid+ "';"))
    db.commit()
    db.close()
    return "", 201

@app.route("/api/delete/user/<uid>", methods=['GET', 'OPTIONS'])
def delete_user(uid):
    print("received")
    db = get_db()
    db.execute(text("DELETE FROM users WHERE uid='"+uid+"';"))
    db.commit()
    db.close()
    return "", 201

@app.route("/api/mark/<item>/<uid>", methods=['GET', 'OPTIONS'])
def mark_as_done(item, uid):
    db = get_db()
    print("received")
    db.execute(text("UPDATE tasks SET complete='True' WHERE what_to_do='"+item+"' AND id='" +uid+ "';"))
    db.commit()
    return "", 201

def get_db(user=user, passw=passw, host=host, db_name=db_name):
    """Opens a new database connection if there is none yet for the
    current application context.
    """
    engine = create_engine(f'postgresql+psycopg2://{user}:{passw}@{host}/{db_name}')
    return engine.connect()
        
        
if __name__ == "__main__":
    app.run("0.0.0.0", 5001)
    
    