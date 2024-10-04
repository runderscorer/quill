function PlayerResponse({ response }) {
  return (
    <div className='response-container'>
      <button 
        className='response own'
        disabled
      >
        {response.text}
      </button>
    </div>
  )
}

export default PlayerResponse
