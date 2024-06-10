import { Outlet } from 'react-router-dom';
import RootHeader from './layout/RootHeader';
import './App.css';

function App() {
	return (
		<>
			<RootHeader />
			<main>
				<Outlet />
			</main>
		</>
	);
}

export default App;
