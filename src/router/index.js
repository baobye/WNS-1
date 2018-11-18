import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
import ChangePassword from '@/components/changePassword'
import Community from '@/components/community'
import Me from '@/components/me'
import Login from '@/components/login'
import BalanceDetails from '@/components/balanceDetails'
import TeamList from '@/components/teamList'
import TopUpCenter from '@/components/topUpCenter'
import Withdrawal from '@/components/withdrawal'
import Transfer from '@/components/transfer'
import Investment from '@/components/investment'
import BonusDetails from '@/components/bonusDetails'
import BonusList from '@/components/bonusList'
import Certificate from '@/components/certificate'
import Share from '@/components/share'
import CardDetails from '@/components/cardDetails'
import InvestmentDetails from '@/components/investmentDetails'
import ShoppingMall from '@/components/shoppingMall'
import StoreList from '@/components/storeList'
import Conpon from '@/components/coupon'
Vue.use(Router)
export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'Loadding',
    //   component: Loadding
    // },
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/storeList',
      name: 'storeList',
      component: StoreList
    },
    {
      path: '/conpon',
      name: 'conpon',
      component: Conpon
    },
    {
      path: '/shoppingMall',
      name: 'shoppingMall',
      component: ShoppingMall
    },
    {
      path: '/changePassword',
      name: 'changePassword',
      component: ChangePassword
    },
    {
      path: '/community',
      name: 'community',
      component: Community
    },
    {
      path: '/me',
      name: 'Me',
      component: Me
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Login
    },
    {
      path: '/balanceDetails',
      name: 'balanceDetails',
      component: BalanceDetails
    },
    {
      path: '/cardDetails',
      name: 'cardDetails',
      component: CardDetails
    },
    {
      path: '/investmentDetails',
      name: 'investmentDetails',
      component: InvestmentDetails
    },
    {
      path: '/teamList',
      name: 'teamList',
      component: TeamList
    },
    {
      path: '/topUpCenter',
      name: 'topUpCenter',
      component: TopUpCenter
    },
    {
      path: '/withdrawal',
      name: 'withdrawal',
      component: Withdrawal
    },
    {
      path: '/transfer',
      name: 'transfer',
      component: Transfer
    },
    {
      path: '/investment',
      name: 'investment',
      component: Investment
    },
    {
      path: '/bonusDetails',
      name: 'bonusDetails',
      component: BonusDetails
    },
    {
      path: '/bonusList',
      name: 'bonusList',
      component: BonusList
    },
    {
      path: '/certificate',
      name: 'certificate',
      component: Certificate
    },
    {
      path: '/share',
      name: 'share',
      component: Share
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
