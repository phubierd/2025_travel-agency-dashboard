import React from 'react';
import type { LoaderFunctionArgs } from 'react-router';
import { getTripById } from '~/appwrite/trips';
import type { Route } from './+types/trips';
import { cn, getFirstWord, parseTripData } from '~/lib/utils';
import { Header, InfoPill } from 'components';
import {
  ChipDirective,
  ChipListComponent,
  ChipsDirective,
} from '@syncfusion/ej2-react-buttons';

// export const loader = async ({ params }: LoaderFunctionArgs) => {
//   const { tripId } = params;
//   if (!tripId) throw new Error('Trip ID is required');
//   return await getTripById(tripId);
// };

// DUMMY data
const tripData = {
  name: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, obcaecati.',
  duration: 5,
  itinerary: [{ location: 'Thailand' }],
  travelStyle: 'Lorem ipsum dolor',
  groupType: 'Lorem ipsum',
  budget: 'Lorem dolor',
  interests: 'ipsum dolor',
  estimatedPrice: '',
  description:
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque nihil ullam pariatur officia eum error exercitationem tenetur dolorum ab fuga omnis debitis, ipsa quo doloremque numquam beatae saepe laborum iste consequuntur. Doloremque ratione veniam est consequatur fugit, rerum necessitatibus temporibus?',
  bestTimeToVisit: '',
  weatherInfo: '',
  country: '',
};
const TripDetail = ({ loaderData }: Route.ComponentProps) => {
  // const tripData = parseTripData(loaderData?.tripDetails);
  // const { name,duration, itinerary,travelStyle,groupType ,budget,interests,estimatedPrice,description,bestTimeToVisit,weatherInfo,country} = tripData || {};
  const {
    name,
    duration,
    itinerary,
    travelStyle,
    groupType,
    budget,
    interests,
    estimatedPrice,
    description,
    bestTimeToVisit,
    weatherInfo,
    country,
  } = tripData || {};

  const imageUrls = [
    'https://fastly.picsum.photos/id/10/2500/1667.jpg?hmac=J04WWC_ebchx3WwzbM-Z4_KC_LeLBWr5LZMaAkWkF68',
    'https://fastly.picsum.photos/id/11/2500/1667.jpg?hmac=xxjFJtAPgshYkysU_aqx2sZir-kIOjNR9vx0te7GycQ',
    'https://fastly.picsum.photos/id/12/2500/1667.jpg?hmac=Pe3284luVre9ZqNzv1jMFpLihFI6lwq7TPgMSsNXw2w',
  ];

  const pillItems = [
    { text: travelStyle, bg: '!bg-pink-50 !text-pink-500' },
    { text: groupType, bg: '!bg-primary-50 !text-primary-500' },
    { text: budget, bg: '!bg-success-50 !text-success-500' },
    { text: interests, bg: '!bg-navy-50 !text-navy-500' },
  ];

  return (
    <main className="travel-detail wrapper plans">
      <section className="container wrapper-md">
        <header>
          <h1 className="p-40-semibold text-dark-100">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Laudantium, id!
          </h1>
          <div className="flex items-center gap-5">
            <InfoPill
              text={`${duration} days plans`}
              image="/assets/icons/calendar.svg"
            />
            <InfoPill
              text={
                itinerary
                  ?.slice(0, 2)
                  .map((item) => item.location)
                  .join(', ') || ''
              }
              image="/assets/icons/location-mark.svg"
            />
          </div>
        </header>

        <section className="gallery">
          {imageUrls.map((url: string, index: number) => (
            <img
              src={url}
              key={index}
              className={cn(
                'w-full rounded-xl object-cover',
                index === 0
                  ? 'md:col-span-2 md:row-span-2 h-[330px]'
                  : 'md:row-span-1 h-[150px]'
              )}
            />
          ))}
        </section>

        <section className="flex gap-3 md:gap-5 items-center flex-wrap">
          <ChipListComponent id="travel-chip">
            <ChipsDirective>
              {pillItems.map((pill, i) => (
                <ChipDirective
                  key={i}
                  text={getFirstWord(pill.text)}
                  cssClass={`${pill.bg} !text-base !font-medium !px-4`}
                />
              ))}
            </ChipsDirective>
          </ChipListComponent>

          <ul className="flex gap-1 items-center">
            {Array(5)
              .fill('null')
              .map((_, i) => (
                <li key={i}>
                  <img
                    src="/assets/icons/star.svg"
                    alt="start"
                    className="size-[18px]"
                  />
                </li>
              ))}

            <li className="ml-1">
              <ChipListComponent>
                <ChipsDirective>
                  <ChipDirective
                    text="4.9/5"
                    cssClass="!bg-red-50 !text-yellow-500"
                  />
                </ChipsDirective>
              </ChipListComponent>
            </li>
          </ul>
        </section>

        <section className="title">
          <article>
            <h3>
              {duration}-Day {country} {travelStyle}
            </h3>
            <p>
              {budget},{groupType} and {interests}
            </p>
          </article>

          <h2>{estimatedPrice}</h2>
        </section>

        <p className="text-sm md:text-lg font-normal text-dark-400">
          {description}
        </p>

        <ul className="itinerary">
          {itinerary?.map((dayPlan: DayPlan, index: number) => (
            <li key={index}>
              <h3>
                Day {dayPlan.day}: {dayPlan.location}
              </h3>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};

export default TripDetail;
