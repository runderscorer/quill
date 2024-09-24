function Response({ response }) {
  const handleClick = (e) => {
    console.log('response clicked:', e.target.value)
  }

  return (
    <div>
      <button 
        onClick={handleClick}
        value={response.id}
      >
        {response.text}
      </button>
    </div>
  )
}

export default Response
