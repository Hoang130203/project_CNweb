import ReactLoading from 'react-loading';

function Loading() {
    return (
        <div style={{ display: 'flex', position: 'fixed', width: '100%', height: '100%', top: 0, left: '0', justifyContent: 'center', alignItems: 'center', backgroundColor: '#e8eeefab', zIndex: '100' }}>
            <ReactLoading type={"spokes"} color={"#6fdbda"} height={'100px'} width={'100px'} />
        </div>
    );
}

export default Loading;