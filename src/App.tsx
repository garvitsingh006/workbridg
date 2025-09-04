import ComingSoonPage from './components/ComingSoonPage'
import { Toaster } from 'react-hot-toast';

function App() {

  return (
    <>
        <ComingSoonPage />
        <Toaster position="top-center" reverseOrder={false} />
    </>
  )
}

export default App
