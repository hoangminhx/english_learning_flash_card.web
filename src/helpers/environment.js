let environment = {}

async function loadEnvironment() {
  const response = await fetch(`${process.env.PUBLIC_URL}/environment.json`)
  environment = await response.json()
}

export { environment, loadEnvironment }