import "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../config/axiosInstance";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ButtonCart, ButtonGoBack } from "../../components/user/Button";
import useFetch from "../../hooks/useFetch";
import ProductDetailSkelton from "../../components/user/ProductDetailSkelton";

export const CourseDetailsPage = () => {
    // const [courseDetails, setCourseDetails] = useState({});
    const { id } = useParams();

    const [courseDetails, isloading, err] = useFetch(`/course/get-courseDetails/${id}`)

    console.log('courseDetails :>> ', courseDetails);
    // function fetchCourseDetails() {
    //     // debugger
    //     axiosInstance({
    //         method: "get",
    //         url: `/course/get-courseDetails/${id}`,
    //     })
    //         .then((res) => {
    //             console.log("res.data.data :>> ", res.data.data);
    //             setCourseDetails(res.data.data);
    //         })
    //         .catch((err) => {
    //             console.log("err :>> ", err);
    //         });
    // }

    return (
        <div>
            {
                courseDetails ? (
                    <div className="grid place-content-center my-2">
                        <div className="border-4 p-2 ">
                            <div className="text-5xl flex justify-center items-center font-medium">
                                {courseDetails?.title || "Title"}
                            </div>
                            <div className="flex justify-center">
                                <img className="w-96" src={courseDetails?.image} alt='image' />
                            </div>
                            <div>
                                <span className="text-2xl">Description:</span>
                                <span className="text-xl">{courseDetails?.description}</span>
                            </div>
                            <div>
                                <div>
                                    <span className="text-2xl">Price: </span>
                                    <span className="text-2xl">{courseDetails?.price}</span>
                                </div>
                                <div className="text-2xl"> Duration: {courseDetails?.duration}</div>
                            </div>
                            <div className="flex justify-between">
                                <div>
                                    <ButtonGoBack />
                                </div>
                                <div>
                                    <ButtonCart id={id} />
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <ProductDetailSkelton />
                )
            }

        </div>
    );
};
