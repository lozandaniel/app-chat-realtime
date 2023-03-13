import { io } from 'socket.io-client'
import { useEffect, useState } from 'react'

const socket = io('http://localhost:3000')

function App() {
  const [message, setMessage] = useState('')
  const [data, setData] = useState([
    {
      body: 'message',
      from: 'user1',
    },
  ])

  const handleSubmit = (e) => {
    e.preventDefault()
    socket.emit('message', message)
    setData([
      ...data,
      {
        body: message,
        from: 'Me',
      },
    ])
    setMessage('')
  }

  useEffect(() => {
    const messageBack = (message) => {
      setData([...data, message])
    }

    socket.on('message', messageBack)
    return () => {
      socket.off('message', messageBack)
    }
  }, [data])

  return (
    <div className="container px-4 w-full flex flex-col items-center justify-center">
      <h1 className="text-6xl leading-none font-extrabold py-8 tracking-tighter text-white">
        Chat
        <span className="text-[#0084fa]"> Global</span>
      </h1>

      <div className=" max-w-2xl w-full shadow-3xl rounded-lg">
        <ul className="h-96 overflow-y-auto">
          {data.map((message, i) => (
            <li
              key={i}
              className={`text-base my-4 px-4 max-w-full table ${
                message.from === 'Me'
                  ? 'bg-[#0084fa] ml-auto rounded-l-lg'
                  : 'bg-[#3E4042] rounded-r-lg'
              }`}
            >
              <p className="font-semibold">{message.from}</p>
              <p>{message.body}</p>
            </li>
          ))}
        </ul>
        <form
          onSubmit={handleSubmit}
          className="flex gap-x-2 py-2 justify-center px-2"
        >
          <input
            className="rounded-xl h-8 px-2 border border-transparent bg-[#3A3B3C] shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 w-full focus:ring-1"
            type="text"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          />
          <button className="px-2 rounded-lg h-8 focus:accent-red">
            <svg fill="#0084fa" height="20px" viewBox="0 0 24 24" width="20px">
              <path d="M16.6915026,12.4744748 L3.50612381,13.2599618 C3.19218622,13.2599618 3.03521743,13.4170592 3.03521743,13.5741566 L1.15159189,20.0151496 C0.8376543,20.8006365 0.99,21.89 1.77946707,22.52 C2.41,22.99 3.50612381,23.1 4.13399899,22.8429026 L21.714504,14.0454487 C22.6563168,13.5741566 23.1272231,12.6315722 22.9702544,11.6889879 C22.8132856,11.0605983 22.3423792,10.4322088 21.714504,10.118014 L4.13399899,1.16346272 C3.34915502,0.9 2.40734225,1.00636533 1.77946707,1.4776575 C0.994623095,2.10604706 0.8376543,3.0486314 1.15159189,3.99121575 L3.03521743,10.4322088 C3.03521743,10.5893061 3.34915502,10.7464035 3.50612381,10.7464035 L16.6915026,11.5318905 C16.6915026,11.5318905 17.1624089,11.5318905 17.1624089,12.0031827 C17.1624089,12.4744748 16.6915026,12.4744748 16.6915026,12.4744748 Z"></path>
            </svg>
          </button>
        </form>
      </div>
    </div>
  )
}

export default App
