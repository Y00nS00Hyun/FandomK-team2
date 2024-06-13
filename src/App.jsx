import { Outlet, useLocation } from 'react-router-dom';
import RootHeader from './layout/RootHeader';

function App() {
	const { pathname } = useLocation();
	return (
    <>
    {pathname !== '/' && <RootHeader />}
			<main id='rootContainer'>
				<Outlet />
			</main>
		</>
	);
}

export default App;
