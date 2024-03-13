import { useEffect } from 'react';

interface modalProps {
    src: string;
    setModal: (arg: boolean) => void;
}

export function Modal (props: modalProps) {
    useEffect(() => {
        console.log('modal')
        console.log(props.src)
        document.body.style.overflow = "hidden";
    }, [])

    const handleClose = () => {
        props.setModal(false);
        document.body.style.overflow = "auto";
    }
    return (
        <div className="w-full h-screen z-30 fixed overflow-hidden flex justify-center align-middle items-center ease-in duration-700 top-0">
            <button onClick={handleClose} className='absolute top-0 right-0 w-full h-full bg-black opacity-60 z-40'></button>
                <img src={props.src} alt='image' className='w-auto h-4/6 opacity-100 z-50 cursor-pointer' onClick={handleClose}/>
        </div>
    )
}