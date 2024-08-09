import React, { useEffect, useState } from 'react';
import { fetchProfile } from '../../service/companyService';
import { useParams } from 'react-router-dom';

const CandidateProfilePage = () => {
    const candidateId=useParams();
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const loadProfile = async () => {
            const data = await fetchProfile(candidateId);
            setProfile(data);
        };
        loadProfile();
    }, [candidateId]);

    if (!profile) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto p-8">
            <div className="bg-white p-8 rounded-lg shadow-md flex">
                <div className="w-3/4 pr-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold">{profile.name}</h1>
                            <span className="bg-green-500 text-white px-2 py-1 rounded-full text-sm">{profile.position}</span>
                            <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-sm ml-2">{profile.level}</span>
                        </div>
                        <button className="bg-red-500 text-white px-4 py-2 rounded-full">Đặt Lịch Phỏng Vấn</button>
                    </div>
                    <div className="mt-6">
                        <h2 className="text-xl font-semibold">Mô tả về bản thân</h2>
                        <p className="mt-2">{profile.about}</p>
                    </div>
                    <div className="mt-6">
                        <h2 className="text-xl font-semibold">Kinh nghiệm làm việc</h2>
                        <ul className="list-disc ml-5 mt-2">
                            {profile.experience.map((exp, index) => (
                                <li key={index}>{exp}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="mt-6">
                        <h2 className="text-xl font-semibold">Định hướng phát triển</h2>
                        <ul className="list-disc ml-5 mt-2">
                            {profile.careerOrientation.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="w-1/4 pl-8">
                    <div className="bg-gray-100 p-4 rounded-lg mb-6">
                        <h3 className="font-semibold">Địa chỉ cá nhân</h3>
                        <p className="mt-2">{profile.address}</p>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-lg mb-6">
                        <h3 className="font-semibold">Kĩ năng</h3>
                        <p className="mt-2">{profile.skills}</p>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-lg mb-6">
                        <h3 className="font-semibold">Thông tin cá nhân</h3>
                        <p className="mt-2">{profile.personalInfo}</p>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-lg mb-6">
                        <button className="bg-red-500 text-white px-4 py-2 rounded-full w-full">Truy Cập CV</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CandidateProfilePage;
