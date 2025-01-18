

import { orders } from '@/data/orders';
import Image from 'next/image';

export default function DashboardPage() {

  return (
    <div className="grid gap-4 md:gap-8">
      <div className="card bg-base-100 w-96 shadow-xl">
        <div>
          <h2>Today&apos;s Orders</h2>
          <p>
            Your orders for today. Keep up the good work!
          </p>
        </div>
        <div  className=" w-full col-span-4">
          <div className="flex flex-col gap-4 w-full ">
            {orders.map((order) => (
              <div className='card  w-full shadow-xl' key={order.id}>
                <div className="flex flex-col justify-between gap-4 py-4 md:flex-row md:items-center w-full">
                  <div className="flex items-center gap-4">
                    <Image
                      alt="Image"
                      className="rounded-md object-cover"
                      height="64"
                      src={order.image || '/deer.svg'}
                      style={{
                        aspectRatio: '64/64',
                        objectFit: 'cover',
                      }}
                      width="64"
                    />
                    <div className="grid flex-1 gap-1">
                      <h3 className="font-semibold">{order.name}</h3>
                      <p className="text-sm text-gray-500">
                        Order ID: {order.orderId}
                      </p>
                    </div>
                  </div>

                  <button >Track</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}