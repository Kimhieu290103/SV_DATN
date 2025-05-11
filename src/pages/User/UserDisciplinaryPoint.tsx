import React, { useEffect, useState } from 'react';
import {
    CircularProgress,
} from '@mui/material';
import { store } from '~/store/store';
import PointApi from '~/api/PointApi';
import MainContent from '~/components/User/MainContent';
import SideNav from '~/components/User/SideNav';

interface DisciplinaryPoint {
    semester: string;
    points: number;
}

const UserDisciplinaryPoint: React.FC = () => {
    const userID = store.getState()?.user?.id;
    const [pointsList, setPointsList] = useState<DisciplinaryPoint[]>([]);
    const [totalPoints, setTotalPoints] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchPoints = async () => {
            setLoading(true);
            try {
                const response = await PointApi.getDisciplinaryPoints();
                if (response?.disciplinaryPoints) {
                    setPointsList(response.disciplinaryPoints);
                    setTotalPoints(response.totalPoints);
                }
            } catch (error) {
                console.error('Lỗi khi lấy điểm rèn luyện:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPoints();
    }, [userID]);

    return (
        <div className='min-h-screen flex flex-col min-h-[280px] min-h-[280px mt-10] mt-10 bg-gradient-to-br from-blue-100 via-white to-purple-100'>
            <div
                className='flex flex-row items-stretch min-h-[500px]
          px-4 md:px-16 lg:px-24 py-20 bg-[#ffffff] w-full
          sm:max-w-full md:max-w-3xl lg:max-w-5xl xl:max-w-7xl 2xl:max-w-[1500px] mx-auto rounded-2xl shadow-xl border border-gray-200 mt-20 mb-20'
            >
                <SideNav />
                <MainContent title='Điểm rèn luyện' decs='Tổng hợp điểm rèn luyện theo từng học kỳ'>
                    {loading ? (
                        <div className='flex justify-center items-center w-full py-10'>
                            <CircularProgress />
                        </div>
                    ) : (
                        <div className='overflow-x-auto w-full mb-4'> {/* Đã thêm class 'w-full' */}
                            <h2 className='text-xl font-bold mb-6 mt-6 '>Điểm rèn luyện theo học kỳ</h2>
                            <table className='w-full border-collapse text-sm md:text-base rounded-sm overflow-hidden '>
                                <thead>
                                    <tr className=' border-0 bg-blue-500 text-white'>
                                        <th className='border-0 p-2 text-left border-blue-950 text-nowrap w-[300px]'>Kỳ học</th>
                                        <th className='border-0 p-2 text-left border-blue-950 text-nowrap w-[80px]'>Điểm</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pointsList && pointsList.length > 0 ? (
                                        pointsList.map((item, index) => (
                                            <tr key={index} className={index % 2 === 0 ? 'bg-gray-200' : 'bg-gray-100'}>
                                                <td className='border-0 p-2'>{item.semester}</td>
                                                <td className='border-0 p-2'>{item.points}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={2} className='border-0 p-4 text-center text-gray-500 bg-gray-200'>
                                                Không có dữ liệu
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                            <div className='mt-4'>
                                <span className='font-semibold'>Tổng điểm rèn luyện:</span> {totalPoints}
                            </div>
                        </div>
                    )}
                </MainContent>
            </div>
        </div>
    );
};

export default UserDisciplinaryPoint;