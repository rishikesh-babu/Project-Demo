import "react";
import { useState } from "react";
import Carousel from "../../components/user/Carousel";

export const Home = () => {
	const [user, setUser] = useState("");

	return (
		<div>
			<section className="min-h-96 flex gap-20 px-20 py-10 w-full">
				<div className="w-8/12">
					<h1 className="font-bold text-4xl my-5">Welcome {user} </h1>
					<p className="text-xl font-normal">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed natus
						possimus aspernatur repellat quod ipsam quis reprehenderit placeat
						quaerat, qui numquam? Assumenda voluptatum officiis adipisci
						blanditiis et quasi repellendus nihil?
					</p>
				</div>
				<div className="w-5/12">
					<img className="w-full" src="" alt="home-image" />
				</div>
			</section>
			<section className="my-16 mx-12">
				<Carousel />
			</section>
		</div>
	);
};
