import Image from 'next/image'
import React from 'react'

export default function Ranking() {
    return (
        <div className="mt-5">
            <div className="flex items-end">
                <Image
                    alt=""
                    height={25}
                    className="mr-2"
                    src={require('../../../../../../public/assets/icons/rank.png')}
                />
                <div className="text-xl text-white">Ranking</div>
            </div>

            <div className="w-full mt-2 overflow-hidden border rounded-lg border-default-border">
                <table className="w-full table-fixed">
                    <thead>
                        <tr className="py-2 text-sm text-left text-secondary bg-bg">
                            <th className="px-8 py-1 text-sm">No.</th>
                            <th className="px-8 py-1 text-sm">Rank</th>
                            <th className="px-8 py-1 text-sm">Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[1, 2, 3, 4, 5].map((v, index) => (
                            <tr key={index}>
                                <td className="px-8 py-3 text-sm">
                                    {index + 1}
                                </td>
                                <td className="px-8 py-3 text-sm">-</td>
                                <td className="px-8 py-3 text-sm">-</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
