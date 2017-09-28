import Vue from 'vue'

import {Button} from 'mint-ui'

// Vue.use(Button)
Vue.component(Button.name, Button)

import {Tabbar,TabItem} from 'mint-ui'
Vue.component(Tabbar.name, Tabbar)
Vue.component(TabItem.name, TabItem);

import { Swipe, SwipeItem } from 'mint-ui';

Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);


import { Cell } from 'mint-ui';

Vue.component(Cell.name, Cell);

import { Checklist } from 'mint-ui';

Vue.component(Checklist.name, Checklist);

import { Field } from 'mint-ui';

Vue.component(Field.name, Field);


import { Actionsheet } from 'mint-ui';

Vue.component(Actionsheet.name, Actionsheet);

import { Header } from 'mint-ui';

Vue.component(Header.name, Header);

import { Picker } from 'mint-ui';

Vue.component(Picker.name, Picker);

import { CellSwipe } from 'mint-ui';

Vue.component(CellSwipe.name, CellSwipe);

import { Badge } from 'mint-ui';

Vue.component(Badge.name, Badge);

import { Lazyload } from 'mint-ui';

Vue.use(Lazyload);