import { Outlet } from 'react-router-dom';
import RootHeader from './layout/RootHeader';

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
