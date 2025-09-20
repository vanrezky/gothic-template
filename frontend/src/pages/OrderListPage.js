import React, { useState } from 'react';
import { Search, Package, Truck, CheckCircle, Clock, CreditCard, RotateCcw, Eye } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { orders } from '../data/mockData';

const OrderListPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredOrders, setFilteredOrders] = useState(orders);

  const statusConfig = {
    'not-payment': {
      label: 'Awaiting Payment',
      icon: CreditCard,
      color: 'bg-red-600',
      description: 'Payment required to process order'
    },
    'packing': {
      label: 'Packing',
      icon: Package,
      color: 'bg-yellow-600',
      description: 'Your order is being prepared'
    },
    'shipping': {
      label: 'Shipping',
      icon: Truck,
      color: 'bg-blue-600',
      description: 'Your order is on the way'
    },
    'complete': {
      label: 'Complete',
      icon: CheckCircle,
      color: 'bg-green-600',
      description: 'Order delivered successfully'
    }
  };

  const getOrdersByStatus = (status) => {
    return filteredOrders.filter(order => order.status === status);
  };

  const getActionButton = (order) => {
    switch (order.status) {
      case 'not-payment':
        return (
          <Button size="sm" className="bg-red-600 hover:bg-red-700">
            <CreditCard className="h-4 w-4 mr-2" />
            Pay Now
          </Button>
        );
      case 'shipping':
        return (
          <Button size="sm" variant="outline" className="border-gray-700 text-gray-300">
            <Eye className="h-4 w-4 mr-2" />
            Track Order
          </Button>
        );
      case 'complete':
        return (
          <Button size="sm" variant="outline" className="border-gray-700 text-gray-300">
            <RotateCcw className="h-4 w-4 mr-2" />
            Reorder
          </Button>
        );
      default:
        return (
          <Button size="sm" variant="outline" className="border-gray-700 text-gray-300">
            <Eye className="h-4 w-4 mr-2" />
            View Details
          </Button>
        );
    }
  };

  const OrderCard = ({ order }) => {
    const status = statusConfig[order.status];
    const StatusIcon = status.icon;

    return (
      <Card className="bg-gray-900 border-gray-700">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full ${status.color} flex items-center justify-center`}>
                <StatusIcon className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold">Order {order.id}</h3>
                <p className="text-gray-400 text-sm">
                  Placed on {new Date(order.date).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge className={`${status.color} text-white`}>
                {status.label}
              </Badge>
              {getActionButton(order)}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 mb-4">
            {order.items.map((item, index) => (
              <img
                key={index}
                src={item.image}
                alt={item.title}
                className="w-12 h-12 object-cover rounded border border-gray-700"
              />
            ))}
            {order.items.length > 4 && (
              <div className="w-12 h-12 bg-gray-800 rounded border border-gray-700 flex items-center justify-center">
                <span className="text-gray-400 text-xs">+{order.items.length - 4}</span>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div>
              <p className="text-gray-400 text-sm">{status.description}</p>
              <p className="text-white text-sm">
                {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
              </p>
            </div>
            <div className="text-right">
              <p className="text-white font-bold text-lg">${order.total.toFixed(2)}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const EmptyState = ({ status }) => (
    <Card className="bg-gray-900 border-gray-700">
      <CardContent className="p-12 text-center">
        <div className="w-16 h-16 mx-auto mb-4 bg-gray-800 rounded-full flex items-center justify-center">
          <Package className="h-8 w-8 text-gray-500" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">
          No {statusConfig[status]?.label.toLowerCase()} orders
        </h3>
        <p className="text-gray-400">
          You don't have any orders with this status yet.
        </p>
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">My Orders</h1>
          <p className="text-gray-400">Track and manage your orders</p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Input
            type="text"
            placeholder="Search by order ID..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              if (e.target.value) {
                setFilteredOrders(
                  orders.filter(order =>
                    order.id.toLowerCase().includes(e.target.value.toLowerCase())
                  )
                );
              } else {
                setFilteredOrders(orders);
              }
            }}
            className="w-full pr-10 bg-gray-900 border-gray-700 focus:border-purple-500 text-gray-100"
          />
          <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      {/* Order Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {Object.entries(statusConfig).map(([key, status]) => {
          const count = getOrdersByStatus(key).length;
          const StatusIcon = status.icon;
          
          return (
            <Card key={key} className="bg-gray-900 border-gray-700">
              <CardContent className="p-4 text-center">
                <div className={`w-12 h-12 mx-auto mb-3 rounded-full ${status.color} flex items-center justify-center`}>
                  <StatusIcon className="h-6 w-6 text-white" />
                </div>
                <p className="text-2xl font-bold text-white mb-1">{count}</p>
                <p className="text-gray-400 text-sm">{status.label}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Orders Tabs */}
      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 bg-gray-800">
          <TabsTrigger value="all" className="data-[state=active]:bg-purple-600">
            All Orders
          </TabsTrigger>
          <TabsTrigger value="not-payment" className="data-[state=active]:bg-purple-600">
            Payment Due
          </TabsTrigger>
          <TabsTrigger value="packing" className="data-[state=active]:bg-purple-600">
            Packing
          </TabsTrigger>
          <TabsTrigger value="shipping" className="data-[state=active]:bg-purple-600">
            Shipping
          </TabsTrigger>
          <TabsTrigger value="complete" className="data-[state=active]:bg-purple-600">
            Complete
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {filteredOrders.length > 0 ? (
            <div className="space-y-4">
              {filteredOrders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          ) : (
            <Card className="bg-gray-900 border-gray-700">
              <CardContent className="p-12 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-800 rounded-full flex items-center justify-center">
                  <Package className="h-8 w-8 text-gray-500" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">No orders found</h3>
                <p className="text-gray-400 mb-6">
                  {searchQuery ? 'No orders match your search criteria.' : 'You haven\'t placed any orders yet.'}
                </p>
                {!searchQuery && (
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    Start Shopping
                  </Button>
                )}
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {Object.keys(statusConfig).map((status) => (
          <TabsContent key={status} value={status} className="space-y-4">
            {getOrdersByStatus(status).length > 0 ? (
              <div className="space-y-4">
                {getOrdersByStatus(status).map((order) => (
                  <OrderCard key={order.id} order={order} />
                ))}
              </div>
            ) : (
              <EmptyState status={status} />
            )}
          </TabsContent>
        ))}
      </Tabs>

      {/* Order Timeline Example */}
      {filteredOrders.length > 0 && (
        <Card className="bg-gray-900 border-gray-700 mt-8">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-gray-800 rounded">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-white text-sm font-medium">Order ORD-2024-001 delivered</p>
                  <p className="text-gray-400 text-xs">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-800 rounded">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <Truck className="h-4 w-4 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-white text-sm font-medium">Order ORD-2024-002 shipped</p>
                  <p className="text-gray-400 text-xs">1 day ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default OrderListPage;