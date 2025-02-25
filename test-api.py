import requests
import json

def test_matching_api():
    url = 'http://localhost:3002/api/matching'
    
    payload = {
        'apiKey': 'test-key',
        'players': [
            {
                'id': 'player1',
                'interests': ['RPG', 'Strategy'],
                'skillLevel': 7
            },
            {
                'id': 'player2',
                'interests': ['RPG', 'MOBA'],
                'skillLevel': 8
            }
        ],
        'groupSize': 2,
        'optimizationGoal': 'balanced'
    }
    
    headers = {'Content-Type': 'application/json'}
    
    try:
        print('Sending request to API...')
        response = requests.post(url, json=payload, headers=headers)
        
        print(f'Response status code: {response.status_code}')
        
        if response.status_code == 200:
            try:
                data = response.json()
                print('API Response:')
                print(json.dumps(data, indent=2))
            except json.JSONDecodeError:
                print('Error parsing JSON response')
                print('Raw response:', response.text)
        else:
            print('Error response:', response.text)
    
    except Exception as e:
        print(f'Error: {e}')

if __name__ == '__main__':
    test_matching_api() 