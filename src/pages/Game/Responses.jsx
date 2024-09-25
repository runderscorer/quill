import Response from './Response'

function Responses({ responses }) {
  return (
    <div className='responses-container'>
      <p>Each choice is a seed -- nurture it wisely and select a response below:</p>
      <div>
        {responses.map(response => 
          <Response 
            key={`response-${response.id}`}
            response={response.attributes} 
          />
        )}
      </div>
    </div>
  )
}

export default Responses
