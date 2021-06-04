import { useEffect } from 'react'
import firebase from 'services/firebase'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function useProtectedRoute() {
  const history = useHistory()

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(function (user) {
      if (!user) {
        toast('Access to protected route denied, redirecting to login...')
        history.push('/login')
      }
    })
    return () => unsubscribe()
  }, [history])
}
