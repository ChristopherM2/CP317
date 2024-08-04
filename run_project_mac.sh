
git pull origin main --force

pip3 install -r requirements.txt
cd cp317-back
python3 manage.py runserver &
cd ../cp317-front
npm install
npm run dev &

sleep 5

open http://localhost:3000
