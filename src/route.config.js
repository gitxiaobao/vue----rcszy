
import Home from './components/Home.vue'
import Category from './components/Category.vue'
import Cart from './components/Cart.vue'
import Me from './components/Me.vue'
import MeAddres from './components/me/Address.vue'
import Order from './components/Order.vue'
import OrderPay from './components/order/Pay.vue'
import OrderDetail from './components/order/Detail.vue'
import ProductDetail from './components/ProductDetail.vue'
import Subscribe from './components/Subscribe.vue'

export default [
	{
		path: '/home',
		component: Home
	},
	{
		path: '/category',
		component: Category
	},
	{
		path: '/cart',
		component: Cart
	},
	{
		path: '/me',
		component: Me
	},
	{		
		path: '/address',
		component: MeAddres
	},
	{
		path: '/order',
		component: Order
	},
	{
		path: '/pay',
		component: OrderPay
	},
	{
		path: '/orderDetail/:id',
		component: OrderDetail
	},
	{
		path: '/productDetail/:id',
		component: ProductDetail
	},
	{
		path: '/subscribe',
		component: Subscribe
	},
	{
		path: '*',
		redirect: '/home'
	},
	{
		path: '/',
		redirect: '/home'
	}
]