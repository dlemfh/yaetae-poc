import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import axios from './custom-axios';

const getData = async () => {
  const response = await axios('GET', '/api/admin/users');
  return response.data;
};

function App() {
  const [state, setState] = useState<Awaited<ReturnType<typeof getData>>>();

  useEffect(() => {
    getData().then((data) => setState(data));
  }, []);

  return <pre>{JSON.stringify(state, null, 2)}</pre>;
}

ReactDOM.render(<App />, document.getElementById('root'));
