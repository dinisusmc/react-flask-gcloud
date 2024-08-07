# React Front Web App Deployed to Google Cloud Kubernetes Cluster 
# With Flask Backend hosted on a Google Cloud VM

# Backend
## Google Cloud Virtual Machine

### To stand up the linux server follow these instructions;

gcloud compute firewall-rules create open-5001 --allow tcp:5001
gcloud compute instances create automato \
    --zone=us-east4-c 

gcloud compute ssh automato
sudo apt-get update

## Database
Postgres is also being hosted on the google cloud virtual machine. Setting this up is optional you can also adjust the configuration to connect to a cloud hosted database.

### To install and set up a data base follow these instructions;
sudo apt install postgresql postgresql-contrib -y
sudo systemctl start postgresql.service
sudo -i -u postgres
psql 
CREATE DATABASE todolist;
exit
psql todolist

CREATE TABLE IF NOT EXISTS users
(
    uid serial primary key,
    last_name varchar NOT NULL,
    first_name varchar NOT NULL
    );

CREATE TABLE IF NOT EXISTS tasks
(
    id varchar not null,
    what_to_do varchar NOT NULL,
    complete boolean DEFAULT false,
    due_date date
    );

INSERT INTO users (last_name, first_name ) VALUES 
    ('Bobby','Ricky'),
    ('Norris', 'Chuck');

INSERT INTO tasks(id, what_to_do, due_date) VALUES 
    ('1', 'Homework', '6-aug-2024'),
    ('1', 'Sleep', '6-aug-2055'),
    ('1', 'Cook Pasta', '7-aug-2024'),
    ('2', 'Pushups', '6-aug-2024'),
    ('2', 'More Pushups', '6-aug-2024'),
    ('2', 'Still More Pushups', '6-aug-2024');

ALTER USER postgres WITH PASSWORD 'password';

exit
exit

## Flask App

This portion is a rest api levergaing the flask web framework on python. I have multiple routes set up for interacting with the Database for this I am utilizing sqlalchemy, psycopg2 and pandas. This is being hosted on google cloud virtual machine with gunicorn.

### To deploy this portion follow these steps;
git clone https://github.com/dinisusmc/cc_project.git
cd cc_project
sudo pip3 install -r requirements.txt
sudo python3 backend.py

## React Front End
Here we set up a dynamic web application using react. We take advantage of browser routing, web hooks, state based component re/rendering and http communication.

## NOTE - You need to update the host domain in ./frontend/src/appConfig.js to point to the api's ip

To deploy this to kubernetes we will first need to zip all of the files in the front end folder and build our docker image.

gcloud artifacts repositories create flask-ims \                                                               
    --project=cisc5550-430923 \
    --repository-format=docker \
    --location=us-east4 \
    --description="Docker repository"


gcloud builds submit \
  --tag us-east4-docker.pkg.dev/cisc5550-430923/flask-ims/react-todo-gke ./frontend.zip

gcloud container clusters create-auto gunicorn-gke --location us-east4

kubectl apply -f deployment.yaml

kubectl apply -f service.yaml

kubectl get services

## Delete cluster when finished
gcloud container clusters delete react-todo-gke \
    --location us-east4