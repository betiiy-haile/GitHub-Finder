
function Footer() {
    const footerYear = new Date().getFullYear()

  return (
    <footer>
      <div className="footer p-10 bg-gray-700 text-primary-content footer-center">
        Copyright &copy; {footerYear} All Rights Reserved
      </div>
    </footer>
  )
}

export default Footer

