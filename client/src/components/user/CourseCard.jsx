import React from 'react'
import { Link } from 'react-router-dom';
import { ButtonCart } from './Button';

function CourseCard({ course }) {
    console.log('course._id :>> ', course._id);
    return (

        <div className="card bg-base-100 w-96 shadow-xl">
            <figure>
                <img
                    src={course?.image}
                    alt="image"
                />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{course?.title}</h2>
                <p> {course?.description?.length > 100 ? `${course?.description.slice(0, 100)}` : course?.description} </p>
                <div className="card-actions justify-between">
                    <Link to={`/coursePageDetail/${course?._id}`}>
                        <button className="btn btn-outline btn-info">
                            More Details
                        </button>
                    </Link>
                    <ButtonCart id={course?._id} />
                </div>
            </div>
        </div>
    )
}

export default CourseCard
