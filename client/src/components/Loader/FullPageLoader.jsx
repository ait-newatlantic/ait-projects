import React from "react"
import gif from "../../static/imgs/gif_1.gif"

export default function FullPageLoader () {
    return(
        <div className='fp-container'>
        <img
          alt='owner'
          className='fp-loader'
          src={gif}
        />
      </div>
    )
}