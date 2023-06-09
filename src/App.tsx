import { useState } from 'react';
import Catalog from './components/Catalog';

export default function App() {
    const [showCatalog, setShowCatalog] = useState(false);

    const handleOpenCatalog = () => {
        setShowCatalog(true);
    };

    return (
        <>
            <div className="wrapper">
                <h1>App</h1>
                <div>
                    <button onClick={handleOpenCatalog}>Open Catalog</button>
                </div>
                {showCatalog && <Catalog />}
            </div>
        </>
    );
}
