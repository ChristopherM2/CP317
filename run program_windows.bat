git pull origin main --force




start /wait powershell -Command "winget install Schniz.fnm; fnm env --use-on-cd | Out-String | Invoke-Expression; fnm use --install-if-missing 20"
start powershell -NoExit -Command "pip3 install -r requirements.txt; cd cp317-back; python3 manage.py runserver"
start powershell -NoExit -Command "cd cp317-front; npm install; npm run dev"

timeout 5
start http://localhost:3000/signup