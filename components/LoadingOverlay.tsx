import type { LoadingProps } from '../types/loadingType.ts';

function LoadingOverlay({ open }: LoadingProps) {
    const loadingOverlay: any = {
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    }

    const spinner = {
        width: '40px',
        height: '40px',
        border: '4px solid #ddd',
        borderTopColor: '#333',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
    }

    if (!open) return null;

    return (
        <div style={loadingOverlay}>
            <div style={spinner} />
        </div>
    );
}

export default LoadingOverlay;