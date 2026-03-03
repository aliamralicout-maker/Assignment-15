
import { Link, useNavigate } from "react-router-dom";
import AuthBg from "../AuthBg/AuthBg";
import { useForm } from "react-hook-form";
import Errors from "../../Errors/Errors";
import * as z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { useContext, useEffect, useState } from "react";
import { TokenContext } from "../../Context/TokenContext";
import MessageError from "../../Errors/MessageError";
import { FiUser } from "react-icons/fi";
import { LuKeyRound } from "react-icons/lu";
import { api } from "../../API/API";
import MessageSuccess from "../../Errors/MessageSuccess";
import { userProfile } from "../../Context/UserprofileContext";

const LoginSchema = z.object({
    email: z.email('*Email is invalid'),
    password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, '"Password must include uppercase, lowercase, number, and special character 🔒"'),
})



export default function Login() {
    const navigate = useNavigate();
    const { saveUserToken } = useContext(TokenContext)
    const { saveUserData } = useContext(userProfile);

    // stat
    const [errorMess, setErrorMess] = useState(null);
    const [successMess, setSuccessMess] = useState(null);

    const { register, handleSubmit, formState: { errors, touchedFields, isSubmitting } } = useForm({
        defaultValues: { email: '', password: '' },
        mode: "onSubmit",
        resolver: zodResolver(LoginSchema),
    });

    async function submitForm(data) {
        try {
            const res = await axios.request({
                method: "POST",
                url: api.URL_LOGIN,
                data,
            })
            if (res.data?.error) {
                throw new Error(res.data?.error);
            } else {
                saveUserToken(res.data.data.token);
                saveUserData(res.data.data.user);
                setSuccessMess('Welcome back 😊');
                setErrorMess(null);
                setTimeout(() => {
                    navigate("/Feed");
                }, 1000);
            }

        } catch (error) {
            setErrorMess(error.response.data.errors);
            setSuccessMess(null);
        }
    }






    return (
        <>
            <ToastContainer />
            <div className="min-h-screen bg-gray-200 flex items-center">
                <div className="mx-auto flex w-full max-w-7xl flex-col lg:flex-row items-center justify-between space-y-6">
                    <div className="w-full max-w-3xl"><AuthBg /></div>
                    {/* ----------------------------- */}
                    <div className="w-full max-w-[430px] mx-10">
                        <div className="rounded-2xl bg-white p-4 sm:p-6">

                            <div className="mb-4 text-center lg:hidden">
                                <h1 className="text-3xl font-extrabold tracking-tight text-[#00298d]">
                                    Route Posts
                                </h1>
                                <p className="mt-1 text-base font-medium leading-snug text-slate-700">
                                    Connect with friends and the world around you on Route Posts.
                                </p>
                            </div>

                            <div className="mb-5 grid grid-cols-2 rounded-xl bg-slate-100 p-1">
                                <button

                                    type="button"
                                    className="rounded-lg py-2 text-sm font-extrabold transition bg-white text-[#00298d] shadow-sm"
                                >
                                    Login
                                </button>
                                <Link to={'/Register'} className="text-center">
                                    <button
                                        className="rounded-lg py-2 text-sm font-extrabold transition text-slate-600 hover:text-slate-800"
                                    >
                                        Register
                                    </button>
                                </Link>
                            </div>

                            <h2 className="text-2xl font-extrabold text-slate-900">
                                Log in to Route Posts
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                                Log in and continue your social journey.
                            </p>

                            {/* form */}
                            <form onSubmit={handleSubmit(submitForm)} className="mt-5 space-y-3.5">

                                {/* email or user name */}
                                <div>
                                    <div className="relative">
                                        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">

                                            <FiUser />
                                        </span>

                                        <input
                                            type="text"
                                            placeholder="Email or username"
                                            className="w-full rounded-xl border bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-800 outline-none transition focus:bg-white border-slate-200 focus:border-[#00298d]"
                                            {...register('email')}
                                        />
                                    </div>
                                </div>
                                <Errors err={errors.email} touch={touchedFields.email} />

                                {/* password */}
                                <div>
                                    <div className="relative">
                                        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">

                                            <LuKeyRound />
                                        </span>

                                        <input
                                            type="password"
                                            {...register('password')}
                                            placeholder="Password"
                                            className="w-full rounded-xl border bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-800 outline-none transition focus:bg-white border-slate-200 focus:border-[#00298d]"
                                        />
                                    </div>
                                </div>
                                <Errors err={errors.password} touch={touchedFields.password} />


                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full rounded-xl py-3 text-base font-extrabold text-white transition disabled:opacity-60 bg-[#00298d] hover:bg-[#001f6b] "
                                >
                                    {isSubmitting ? "Logging in..." : "Log In"}
                                </button>

                                <button
                                    className="mx-auto block text-sm font-semibold text-[#00298d] transition hover:underline"
                                >
                                    Forgot password?
                                </button>

                                {errorMess && <MessageError errorMess={errorMess} />}
                                {successMess && <MessageSuccess successMess={successMess} />}
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

// 