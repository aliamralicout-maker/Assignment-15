

const authH1 = 'Route Posts';
const authP ='Connect with friends and the world around you on Route Posts.';



export default function AuthBg() {
    return (
        
        <main className="mx-20 ">
        <header>
            <h1 className="text-6xl font-bold text-blue-900">{authH1}</h1>
            <p className="text-2xl mt-3 text-gray-900 font-bold">{authP}</p>
        </header>

        <div className="mt-6 rounded-2xl border border-[#c9d5ff] bg-white/80 p-4 shadow-sm backdrop-blur sm:p-5  text-center ">
            <p className="text-sm font-extrabold uppercase tracking-[0.14em] text-[#00298d]">
                About Route Academy
            </p>

            <p className="mt-1 text-lg font-bold text-slate-900">
                Egypt's Leading IT Training Center Since 2012
            </p>

            <p className="mt-2 text-sm leading-relaxed text-slate-700">
                Route Academy is the premier IT training center in Egypt, established in 2012.
                We specialize in delivering high-quality training courses in programming, web
                development, and application development. We've identified the unique challenges
                people may face when learning new technology and made efforts to provide strategies
                to overcome them.
            </p>

            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
                <div className="rounded-xl border border-[#c9d5ff] bg-[#f2f6ff] px-3 py-2">
                    <p className="text-base font-extrabold text-[#00298d]">2012</p>
                    <p className="text-[11px] font-bold uppercase tracking-wide text-slate-600">
                        Founded
                    </p>
                </div>

                <div className="rounded-xl border border-[#c9d5ff] bg-[#f2f6ff] px-3 py-2">
                    <p className="text-base font-extrabold text-[#00298d]">40K+</p>
                    <p className="text-[11px] font-bold uppercase tracking-wide text-slate-600">
                        Graduates
                    </p>
                </div>

                <div className="rounded-xl border border-[#c9d5ff] bg-[#f2f6ff] px-3 py-2">
                    <p className="text-base font-extrabold text-[#00298d]">50+</p>
                    <p className="text-[11px] font-bold uppercase tracking-wide text-slate-600">
                        Partner Companies
                    </p>
                </div>

                <div className="rounded-xl border border-[#c9d5ff] bg-[#f2f6ff] px-3 py-2">
                    <p className="text-base font-extrabold text-[#00298d]">5</p>
                    <p className="text-[11px] font-bold uppercase tracking-wide text-slate-600">
                        Branches
                    </p>
                </div>

                <div className="rounded-xl border border-[#c9d5ff] bg-[#f2f6ff] px-3 py-2">
                    <p className="text-base font-extrabold text-[#00298d]">20</p>
                    <p className="text-[11px] font-bold uppercase tracking-wide text-slate-600">
                        Diplomas Available
                    </p>
                </div>
            </div>
        </div>
        </main>
        
    )
}


