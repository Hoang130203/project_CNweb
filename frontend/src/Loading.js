import { useEffect, useState } from 'react';
import ReactLoading from 'react-loading';

function Loading() {
    const [isAdminPage, setIsAdminPage] = useState(false)
    useEffect(() => {
        setIsAdminPage(window.location.pathname.includes('admin'))
    }, [])
    return (
        <div style={{ display: 'flex', position: 'fixed', width: '100%', height: '100%', top: 0, left: '0', justifyContent: 'center', alignItems: 'center', backgroundColor: isAdminPage ? '#232323b5' : '#e8eeefab', zIndex: isAdminPage ? '200' : '100' }}>
            <ReactLoading type={"spokes"} color={"#6fdbda"} height={'100px'} width={'100px'} />
        </div>
    );
}

export default Loading;