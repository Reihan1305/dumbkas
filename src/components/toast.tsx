import React from 'react'

interface Iprops{
    closeToast : () => void,
    message:string,
    background:string,
}

const Toast: React.FC<Iprops> = ({background,message,closeToast}) => {
  return (
        <div
          className={`fixed right-4 top-4 z-50 rounded-md bg-${background} px-4 py-2 text-white transition hover:bg-green-600`}
          onClick={closeToast}
        >
          <div className="flex items-center space-x-2">
            <span className="text-3xl">
              <i className="bx bx-check"></i>
            </span>
            <p className="font-bold">{message}</p>
          </div>
        </div>
  )
}

export default Toast