import { Header } from 'components';
import React from 'react';
import {
  ColumnsDirective,
  ColumnDirective,
  GridComponent,
} from '@syncfusion/ej2-react-grids';
import { users } from '~/constants';
import { cn } from '~/lib/utils';
import { getAllUsers } from '~/appwrite/auth';
import type { Route } from './+types/all-users';

// cannot call api
// export const loader = async () => {
//   const { users, total } = await getAllUsers(10, 0);

//   return { users, total };
// };

const AllUsers = ({ loaderData }: Route.ComponentProps) => {
  // const { total, users } = loaderData;

  return (
    <main className="all-users wrapper">
      <Header
        title="Manage Users"
        description="Filter, sort, and access fetailed user profiles"
      />

      <GridComponent dataSource={users} gridLines="None">
        <ColumnsDirective>
          <ColumnDirective
            field="name"
            headerText="Name"
            width="200"
            textAlign="Left"
            template={(props: UserData) => (
              <div className="flex items-center gap-1.5 px-4">
                <img
                  src={props.imageUrl}
                  alt="user"
                  className="rounded-full size-8 aspect-square"
                />
                <span>{props.name}</span>
              </div>
            )}
          />
          <ColumnDirective
            field="email"
            headerText="Email"
            width="200"
            textAlign="Left"
          />
          <ColumnDirective
            field="dateJoined"
            headerText="Date Joined"
            width="120"
            textAlign="Left"
          />
          <ColumnDirective
            field="itineraryCreated"
            headerText="Trip Created"
            width="130"
            textAlign="Left"
          />
          <ColumnDirective
            field="status"
            headerText="Type"
            width="100"
            textAlign="Left"
            template={(props: UserData) => (
              <article
                className={cn(
                  'status-column',
                  props.status === 'user' ? 'bg-success-50' : 'bg-light-300'
                )}
              >
                <div
                  className={cn(
                    'size-1.5 rounded-full',
                    props.status === 'user' ? 'bg-success-500' : 'bg-gray-500'
                  )}
                ></div>
                <h3
                  className={cn(
                    'font-inter text-xs font-medium',
                    props.status === 'user'
                      ? 'text-success-700'
                      : 'text-gray-500'
                  )}
                >
                  {props.status}
                </h3>
              </article>
            )}
          />
        </ColumnsDirective>
      </GridComponent>
    </main>
  );
};

export default AllUsers;
