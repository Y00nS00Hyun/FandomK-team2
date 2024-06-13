import { Outlet, useLocation } from 'react-router-dom';
import RootHeader from './layout/RootHeader';
import BackgroundDecoration from './components/BackgroundDecoration/BackgroundDecoration';

function App() {
	const { pathname } = useLocation();
	return (
		<>
			{pathname !== '/' && <RootHeader />}
			<main id='rootContainer'>
				<BackgroundDecoration />
				<Outlet />
			</main>
		</>
	);
}

export default App;
