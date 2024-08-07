function rendButton (button){
    if (button.exists){
        return (<div className="mt-10 flex items-center justify-center gap-x-6">
                    <a href={button.href} className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        {button.text}
                    </a>
                </div>)
    }} 

export default function Article({art, button, style}) {
    return (

        <div className="relative pt-14" style={style}>
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                {art.head}
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                {art.body}
              </p>
              
              {rendButton(button)}
              
      
            </div>
          </div>
        </div>
    );}