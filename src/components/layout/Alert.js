import { useContext } from "react"
import AlertContext from "../../context/alert/AlertContext"

const Alert = () => {
    const { alert } = useContext(AlertContext)

  return (
    alert !== null && (
      <div className={`alert alert-${alert.type}`}>
        <strong>{alert.msg}</strong>
      </div>
    )
  );
}

export default Alert
