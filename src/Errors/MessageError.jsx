

export default function MessageError({errorMess}) {
    return (
        <div>
            {errorMess && <p className="bg-red-50 border text-center border-red-200 rounded-2xl text-red-800 w-full py-2 ps-10">{errorMess}</p>}
        </div>
    )
}
