import { useOutletContext } from "react-router-dom"
import Response from './Response'

function Responses() {
  const context = useOutletContext()
  const { gameInfo } = context;
  const { current_prompt: currentPrompt } = gameInfo
  const { responses } = currentPrompt

  return (
    <div>
      <p>Complete the poem by selecting a response below:</p>
      <div>
        {responses.map(response => 
          <Response 
            key={`response-${response.id}`}
            response={response} 
          />
        )}
      </div>
    </div>
  )
}

export default Responses
