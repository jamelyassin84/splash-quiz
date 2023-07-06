import {MessageActions} from '@/app/core/store/message/message.actions'
import {playerSelector} from '@/app/core/store/players/players.selectors'
import {roundSelector} from '@/app/core/store/round/round.selectors'
import {useFormik} from 'formik'
import React from 'react'
import {useDispatch, useSelector} from 'react-redux'

export default function NewChat() {
    const dispatch = useDispatch()

    const round = useSelector(roundSelector)
    const player = useSelector(playerSelector)

    const formik = useFormik({
        initialValues: {
            message: '',
        },
        validate: (values) => {
            const errors: any = {}
            if (!values.message.trim()) {
                errors.message = 'Message is required'
            }
            return errors
        },
        onSubmit: (values, {resetForm}) => {
            dispatch(
                MessageActions.add({
                    playerId: player!.id,
                    roundId: round!.id,
                    content: values.message.trim(),
                } as any) as any,
            )
            resetForm()
        },
    })

    const isRoundPlayerUndefined = !round || !player

    const handleKeyDown = (event: any) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault()
            formik.handleSubmit()
        }
    }

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="flex items-center px-2 py-1 bg-chat-footer">
                <textarea
                    name="message"
                    value={formik.values.message}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    onKeyDown={handleKeyDown}
                    className="w-full px-3 py-3 mr-4 border rounded-lg border-default-border bg-input"
                    rows={3}
                />
                <button
                    type="submit"
                    className={`px-10 py-3 my-3 font-bold text-center rounded-md active:opacity-50 ${
                        isRoundPlayerUndefined ||
                        !formik.isValid ||
                        formik.isSubmitting
                            ? 'bg-disabled pointer-events-none'
                            : 'bg-gradient-to-r from-pink to-orange md:hover:brightness-150'
                    }`}
                    disabled={
                        isRoundPlayerUndefined ||
                        !formik.isValid ||
                        formik.isSubmitting
                    }
                >
                    Start
                </button>
            </div>
        </form>
    )
}
