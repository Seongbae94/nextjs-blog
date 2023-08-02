"use client";
import directus from "@/lib/directus";
import { getDictionary } from "@/lib/getDictionary";
import { revalidatePath, revalidateTag } from "next/cache";
import Image from "next/image";
import React, { useState } from "react";

const CTACard = ({ dictionary }: { dictionary: any }) => {
  // const formAction = async (formData: FormData) => {
  //   "use server";
  //   try {
  //     const email = formData.get("email");
  //     await directus.items("subscribers").createOne({
  //       email,
  //     });
  //     revalidateTag("subscribers-count");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const subscribersCount = await fetch(
  //   `${process.env.NEXT_PUBLIC_API_URL}items/subscribers?meta=total_count&access_token=${process.env.ADMIN_TOKEN}`,
  //   {
  //     next: {
  //       tags: ["subscribers-count"],
  //     },
  //   }
  // )
  //   .then((res) => res.json())
  //   .then((res) => res.meta.total_count)
  //   .catch((error) => console.log(error));

  const [email, setEmail] = useState("");
  const [isHandling, setIsHandling] = useState(false);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsHandling(true);
      await directus.items("subscribers").createOne({ email });
      setIsHandling(false);
      setEmail("");
    } catch (error) {
      alert(error);
      setIsHandling(false);
    }
  };

  return (
    <div className="rounded-md bg-slate-100 py-10 px-6 relative overflow-hidden">
      <div className="absolute z-10 inset-0 bg-gradient-to-br from-white/95 via-white/70 to-white/30" />
      <Image
        fill
        src="https://images.unsplash.com/photo-1448906654166-444d494666b3?ixid=MnwzODU2NTF8MHwxfHNlYXJjaHwyNXx8bG9uZG9ufGVufDB8fHx8MTY3MDI3MzM3Ng&ixlib=rb-4.0.3"
        alt="CTA Card Image"
        className="object-center object-cover"
      />
      <div className="relative z-20">
        <div className="font-medium text-lg">#exploretheworld</div>
        <h3 className="text-4xl font-semibold mt-3">
          {dictionary.ctaCard.title}
        </h3>
        <p className="mt-2 text-lg max-w-lg">
          {dictionary.ctaCard.description}
        </p>
        <form
          // key={subscribersCount + "subscribers-form"}
          // action={formAction}
          onSubmit={(e) => submitHandler(e)}
          className="mt-6 flex items-center gap-2 w-full"
        >
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={dictionary.ctaCard.placeholder}
            className="md:w-auto w-full bg-white/80 text-base rounded-md placeholder:text-sm py-2 px-3 outline-none focus:ring-2 ring-neutral-600"
          />
          <button
            type="submit"
            className="bg-neutral-900 rounded-md whitespace-nowrap py-2 px-3 text-neutral-200"
          >
            {!isHandling ? dictionary.ctaCard.button : "Sending..."}
          </button>
        </form>

        {/* <div className="mt-5 text-neutral-700">
          {dictionary.ctaCard.subscriberText1}{" "}
          <span className="bg-neutral-700 rounded-md text-neutral-100 py-1 px-2 text-sm">
            {subscribersCount}
          </span>{" "}
          {dictionary.ctaCard.subscriberText2}
        </div> */}
      </div>
    </div>
  );
};

export default CTACard;
