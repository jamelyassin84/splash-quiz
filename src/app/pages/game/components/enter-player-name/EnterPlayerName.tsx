'use client'
import React from 'react'
import {useFormik as useForm} from 'formik'
import * as Yup from 'yup'
import {useDispatch} from 'react-redux'
import {PlayerActions} from '@/app/core/store/players/players.actions'

export default function EnterPlayerName() {
    const dispatch = useDispatch()

    const validationSchema = Yup.object({
        name: Yup.string().required('Player name is required'),
    })

    const form = useForm({
        initialValues: {
            name: '',
        },
        validationSchema,
        onSubmit: (values) => {
            const player = {...values, isCPU: false, totalPoints: '50'}
            dispatch(PlayerActions.upsert(player) as any)
        },
    })

    return (
        <div className="flex flex-col items-center border border-default-border bg-card-bg rounded-lg min-h-[600px] h-full">
            <div className="my-20 text-3xl font-bold text-secondary">
                Welcome
            </div>

            <div className="mb-3 text-sm text-secondary/80">
                Please Insert Your Name
            </div>

            <form className="w-full px-10" onSubmit={form.handleSubmit}>
                <input
                    type="text"
                    name="name"
                    value={form.values.name}
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                    className="w-full px-3 py-3 border rounded-lg border-default-border bg-input"
                />

                <button
                    type="submit"
                    className={`w-full py-3 my-3 font-bold text-center rounded-md ${
                        !form.isValid || form.isSubmitting || !form.values.name
                            ? 'bg-disabled pointer-events-none'
                            : 'bg-gradient-to-r from-pink to-orange md:hover:brightness-150'
                    }`}
                    disabled={
                        !form.isValid || form.isSubmitting || !form.values.name
                    }
                >
                    Accept
                </button>
            </form>
        </div>
    )
}
