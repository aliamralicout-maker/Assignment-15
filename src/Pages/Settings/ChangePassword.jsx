import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { FaKey } from 'react-icons/fa';
import * as z from 'zod'
import Errors from '../../Errors/Errors';
import { ApiChangePAssword } from '../../Service/ChangePasswordService';
import { useContext, useState } from 'react';
import { TokenContext } from '../../Context/TokenContext';
import MessageSuccess from '../../Errors/MessageSuccess';
import MessageError from '../../Errors/MessageError';


const ChangePassSchema = z.object({
    password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Password must include uppercase, lowercase, number, and special character 🔒'),
    newPassword: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Password must include uppercase, lowercase, number, and special character 🔒'),
    rePassword: z.string(),
}).refine((pas) => pas.newPassword === pas.rePassword, {
    message: '*Passwords must match',
    path: ['rePassword'],
})


export default function ChangePassword() {

    const { saveUserToken, userToken } = useContext(TokenContext);
    const [successMess, setSuccessMess] = useState("");
    const [errorMess, setErrorMess] = useState("");


    const { formState: { errors, touchedFields }, register, handleSubmit, reset } = useForm({
        defaultValues: { password: '', newPassword: '', rePassword: '' },
        resolver: zodResolver(ChangePassSchema),
        mode: 'onChange',
        onSuccess: () => {
            reset();
        }
    })





    const { mutate, isPending, isSuccess, isError } = useMutation({
        mutationKey: ['ApiChangePassword'],
        mutationFn: (data) => ApiChangePAssword(data, userToken),

        onSuccess: (res) => {
            console.log(res.data.data.token);
            saveUserToken(res.data.data.token);
            setSuccessMess(res.data.message);
            setErrorMess('');
        },

        onError: (err) => {
            setErrorMess(err.response?.data?.message)
            setSuccessMess('');
        },
    });


    function handleFormSubmit(data) {

        mutate({
            password: data.password,
            newPassword: data.newPassword,
        });
    };






    return (
        <div className="mx-auto max-w-2xl mt-30">
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                {/* Header */}
                <div className="mb-5 flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#e7f3ff] text-[#1877f2]">
                        <FaKey size={18} />
                    </span>
                    <div>
                        <h1 className="text-xl font-extrabold text-slate-900 sm:text-2xl">Change Password</h1>
                        <p className="text-sm text-slate-500">Keep your account secure by using a strong password.</p>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4" noValidate>

                    <label className="block">
                        <span className="mb-1.5 block text-sm font-bold text-slate-700">Current password</span>
                        <input
                            placeholder="Enter current password"
                            className="w-full rounded-xl border bg-slate-50 px-3 py-2.5 text-sm text-slate-800 outline-none transition border-slate-200 focus:border-[#1877f2] focus:bg-white"
                            {...register('password')}
                        />
                        <Errors err={errors.password} touch={touchedFields.password} />
                    </label>

                    <label className="block">
                        <span className="mb-1.5 block text-sm font-bold text-slate-700">New password</span>
                        <input
                            placeholder="Enter new password"
                            className="w-full rounded-xl border bg-slate-50 px-3 py-2.5 text-sm text-slate-800 outline-none transition border-slate-200 focus:border-[#1877f2] focus:bg-white"
                            {...register('newPassword')}
                        />
                        <Errors err={errors.newPassword} touch={touchedFields.newPassword} />
                    </label>

                    <label className="block">
                        <span className="mb-1.5 block text-sm font-bold text-slate-700">Confirm new password</span>
                        <input
                            placeholder="Re-enter new password"
                            className="w-full rounded-xl border bg-slate-50 px-3 py-2.5 text-sm text-slate-800 outline-none transition border-slate-200 focus:border-[#1877f2] focus:bg-white"
                            {...register('rePassword')}
                        />
                        <Errors err={errors.rePassword} touch={touchedFields.rePassword} />
                    </label>

                    <button
                        disabled={isPending}
                        className="inline-flex w-full items-center mb-5 justify-center rounded-xl bg-[#1877f2] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#166fe5] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {isPending ? "Updating..." : "Update password"}
                    </button>
                </form>

                {isSuccess &&
                    <MessageSuccess successMess={successMess} />
                }

                {isError &&
                    <MessageError errorMess={errorMess} />
                }

            </section>
        </div>
    );
}