
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Errors from "../../Errors/Errors";
import AuthBg from "../AuthBg/AuthBg";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import MessageError from "../../Errors/MessageError";
import MessageSuccess from "../../Errors/MessageSuccess";
import { LuKeyRound, LuUsers } from "react-icons/lu";
import { FiUser } from "react-icons/fi";
import { CiAt } from "react-icons/ci";
import { BsCalendar2DateFill } from "react-icons/bs";
import { registerSchema } from "../../Schema/Schema";



export default function Register() {
    // const data
    const API_URL = 'https://route-posts.routemisr.com/users/signup';
    const notify = (mes) => toast.success(mes);
    const notifyError = (mes) => toast.error(mes);
    let timeIndexS, timeIndexE;

    // Navigate
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors, touchedFields, isSubmitting } } = useForm({
        defaultValues: { name: '', username: '', email: '', password: '', rePassword: '', dateOfBirth: '', gender: '' },
        mode: "onSubmit",
        resolver: zodResolver(registerSchema),
    });

    // stat
    const [errorMess, setErrorMess] = useState(null);
    const [successMess, setSuccessMess] = useState(null);

    // cal api function
    async function submitForm(data) {
        try {
            const res = await axios.request({
                method: 'POST',
                url: API_URL,
                data,
            });
            console.log(res);

            if (res.data?.error) {
                throw new Error(res.data?.error);
            } else {
                timeIndexS = notify('Your account has been created');
                setTimeout(() => {
                    navigate('/Login');
                }, 1000);
                setSuccessMess('Your account has been created');
                setErrorMess(null)
            }

        } catch (error) {
            timeIndexE = notifyError(error.response.data.error);
            setErrorMess(error.response.data.errors);
            setSuccessMess(null);
        }
    }


    useEffect(() => {
        return () => {
            clearTimeout(timeIndexS);
            clearTimeout(timeIndexE);
        }
    }, [])

    return (
        <>
            <ToastContainer />
            <div className="min-h-screen bg-gray-200 flex items-center">
                <div className="mx-auto flex w-full max-w-7xl flex-col lg:flex-row items-center justify-between space-y-6 ">
                    {/* ----------------- Auth Bg ----------------- */}
                    <div className="w-full max-w-3xl"><AuthBg /></div>
                    {/* ---------------------------------- */}

                    <section className="order-1 w-full max-w-[430px] lg:order-2">
                        <div className="rounded-2xl bg-white p-4 sm:p-6">

                            <div className="mb-4 text-center lg:hidden">
                                <h1 className="text-3xl font-extrabold tracking-tight text-[#00298d]">
                                    Route Posts
                                </h1>
                                <p className="mt-1 text-base font-medium leading-snug text-slate-700">
                                    Connect with friends and the world around you on Route Posts.
                                </p>
                            </div>

                            {/* login & register */}
                            <div className="mb-5 grid grid-cols-2 rounded-xl bg-slate-100 p-1">
                                <Link to={'/Login'} className="text-center" >
                                    <button
                                        className="rounded-lg py-2 text-sm font-extrabold transition text-slate-600 hover:text-slate-800"
                                    >
                                        Login
                                    </button>
                                </Link>
                                <button
                                    className="rounded-lg py-2 text-sm font-extrabold transition bg-white text-[#00298d] shadow-sm"
                                >
                                    Register
                                </button>
                            </div>

                            <h2 className="text-2xl font-extrabold text-slate-900">
                                Create a new account
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                                It is quick and easy.
                            </p>

                            {/* form */}
                            <form onSubmit={handleSubmit(submitForm)} className="mt-5 space-y-3.5">

                                {/* full name */}
                                <div>
                                    <div className="relative">
                                        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                                            <FiUser />
                                        </span>

                                        <input
                                            type="text"
                                            placeholder="Full name"
                                            className="w-full rounded-xl border bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-800 outline-none transition focus:bg-white border-slate-200 focus:border-[#00298d]"
                                            {...register('name')}
                                        />
                                    </div>
                                </div>
                                <Errors err={errors.name} touch={touchedFields.name} />

                                {/* user name */}
                                <div>
                                    <div className="relative">
                                        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                                            <CiAt />
                                        </span>

                                        <input
                                            type="text"
                                            {...register('username')}
                                            placeholder="Username (optional)"
                                            className="w-full rounded-xl border bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-800 outline-none transition focus:bg-white border-slate-200 focus:border-[#00298d]"
                                        />
                                    </div>
                                </div>
                                <Errors err={errors.username} touch={touchedFields.username} />

                                {/* email */}
                                <div>
                                    <div className="relative">
                                        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                                            <CiAt />
                                        </span>

                                        <input
                                            type="text"
                                            {...register('email')}
                                            placeholder="Email address"
                                            className="w-full rounded-xl border bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-800 outline-none transition focus:bg-white border-slate-200 focus:border-[#00298d]"
                                        />
                                    </div>
                                </div>
                                <Errors err={errors.email} touch={touchedFields.email} />

                                {/* gender */}
                                <div>
                                    <div className="relative">
                                        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                                            <LuUsers />
                                        </span>

                                        <select
                                            {...register('gender')}
                                            className="w-full rounded-xl border bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-800 outline-none transition focus:bg-white border-slate-200 focus:border-[#00298d]"
                                        >
                                            <option value="">Select gender</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                        </select>
                                    </div>
                                </div>
                                <Errors err={errors.gender} touch={touchedFields.gender} />

                                {/* date */}
                                <div>
                                    <div className="relative">
                                        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                                            <BsCalendar2DateFill />
                                        </span>

                                        <input
                                            type="date"
                                            {...register("dateOfBirth")}
                                            placeholder="Date of birth"
                                            className="w-full rounded-xl border bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-800 outline-none transition focus:bg-white border-slate-200 focus:border-[#00298d]"
                                        />
                                    </div>
                                </div>
                                <Errors err={errors.dateOfBirth} touch={touchedFields.dateOfBirth} />

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

                                {/* repassword */}
                                <div>
                                    <div className="relative">
                                        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                                            <LuKeyRound />
                                        </span>

                                        <input
                                            type="password"
                                            {...register('rePassword')}
                                            placeholder="Confirm password"
                                            className="w-full rounded-xl border bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-800 outline-none transition focus:bg-white border-slate-200 focus:border-[#00298d]"
                                        />
                                    </div>
                                </div>
                                <Errors err={errors.rePassword} touch={touchedFields.rePassword} />


                                {/* button create */}
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full rounded-xl py-3 text-base font-extrabold text-white transition disabled:opacity-60 bg-[#00298d] hover:bg-[#001f6b]"
                                >
                                    {isSubmitting ? "Creating..." : "Create New Account"}
                                </button>

                                <MessageError errorMess={errorMess} />
                                <MessageSuccess successMess={successMess} />

                            </form>

                        </div>
                    </section>

                </div>
            </div>
        </>
    );
}
