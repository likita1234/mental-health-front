import './assets/main.css'
import { createApp, reactive } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'

import AppWrapper from './AppWrapper.vue'
import router from './router'
import EventBus from './utils/event-bus'

// PrimeVue Components starts

import AutoComplete from 'primevue/autocomplete'
import Accordion from 'primevue/accordion'
import AccordionTab from 'primevue/accordiontab'
import Avatar from 'primevue/avatar'
import AvatarGroup from 'primevue/avatargroup'
import Badge from 'primevue/badge'
import BadgeDirective from 'primevue/badgedirective'
import Button from 'primevue/button'
import Breadcrumb from 'primevue/breadcrumb'
import Calendar from 'primevue/calendar'
import Card from 'primevue/card'
import Carousel from 'primevue/carousel'
import Checkbox from 'primevue/checkbox'
import Chip from 'primevue/chip'
import Chips from 'primevue/chips'
import Column from 'primevue/column'
import ConfirmDialog from 'primevue/confirmdialog'
import ConfirmPopup from 'primevue/confirmpopup'
import ConfirmationService from 'primevue/confirmationservice'
import DataTable from 'primevue/datatable'
import Dialog from 'primevue/dialog'
import Divider from 'primevue/divider'
import Dropdown from 'primevue/dropdown'
import Editor from 'primevue/editor'
import FileUpload from 'primevue/fileupload'
import Galleria from 'primevue/galleria'
import Image from 'primevue/image'
import InlineMessage from 'primevue/inlinemessage'
import Inplace from 'primevue/inplace'
import InputNumber from 'primevue/inputnumber'
import InputSwitch from 'primevue/inputswitch'
import InputText from 'primevue/inputtext'
import Knob from 'primevue/knob'
import Message from 'primevue/message'
import MultiSelect from 'primevue/multiselect'
import OverlayPanel from 'primevue/overlaypanel'
import Paginator from 'primevue/paginator'
import Password from 'primevue/password'
import ProgressBar from 'primevue/progressbar'
import ProgressSpinner from 'primevue/progressspinner'
import Rating from 'primevue/rating'
import RadioButton from 'primevue/radiobutton'
import Ripple from 'primevue/ripple'
import SelectButton from 'primevue/selectbutton'
import ScrollPanel from 'primevue/scrollpanel'
import ScrollTop from 'primevue/scrolltop'
import Slider from 'primevue/slider'
import Skeleton from 'primevue/skeleton'
import Steps from 'primevue/steps'
import StyleClass from 'primevue/styleclass'
import Tag from 'primevue/tag'
import Textarea from 'primevue/textarea'
import Toast from 'primevue/toast'
import ToastService from 'primevue/toastservice'
import Toolbar from 'primevue/toolbar'
import Tooltip from 'primevue/tooltip'
import ToggleButton from 'primevue/togglebutton'
import TriStateCheckbox from 'primevue/tristatecheckbox'

// PrimeVue components ends

import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'

// My custom components
import BaseTextInput from './components/form-inputs/BaseTextInput.vue'
import BaseTextarea from './components/form-inputs/BaseTextarea.vue'
import BaseCalendarInput from './components/form-inputs/BaseCalendarInput.vue'
import BaseDropdown from './components/form-inputs/BaseDropdown.vue'
import BaseEditor from './components/form-inputs/BaseEditor.vue'
import BaseNumberInput from './components/form-inputs/BaseNumberInput.vue'
import BaseRating from './components/form-inputs/BaseRating.vue'
import BaseSelectionInput from './components/form-inputs/BaseSelectionInput.vue'

import CustomTable from './components/utils/CustomTable.vue'
import FormDialog from './components/utils/FormDialog.vue'
import DataTypeTag from './components/global/DataTypeTag.vue'
import LanguageSelection from './components/utils/LanguageSelection.vue'

// Question Components
import CustomQuestion from './components/question/components/CustomQuestion.vue'

// Font awesome plugins
import { config, library } from '@fortawesome/fontawesome-svg-core'
import {
  FontAwesomeIcon,
  FontAwesomeLayers,
  FontAwesomeLayersText
} from '@fortawesome/vue-fontawesome'

import { fab } from '@fortawesome/free-brands-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'

// config.autoAddCss = false

library.add(fab, far, fas)

const app = createApp(AppWrapper)

app.use(createPinia())

app.use(PrimeVue, {
  ripple: true,
  inputStyle: ''
})

// zIndex: {
//   modal: 1100, //dialog, sidebar
//   overlay: 1000, //dropdown, overlaypanel
//   menu: 1000, //overlay menus
//   tooltip: 1100 //tooltip
// }
app.use(ConfirmationService)
app.use(ToastService)
app.use(router)

app.directive('tooltip', Tooltip)
app.directive('ripple', Ripple)
app.directive('badge', BadgeDirective)
app.directive('styleclass', StyleClass)

app.component('Accordion', Accordion)
app.component('AccordionTab', AccordionTab)
app.component('AutoComplete', AutoComplete)
app.component('Avatar', Avatar)
app.component('AvatarGroup', AvatarGroup)
app.component('Badge', Badge)
app.component('Breadcrumb', Breadcrumb)
app.component('Button', Button)
app.component('Card', Card)
app.component('Checkbox', Checkbox)
app.component('Chip', Chip)
app.component('Chips', Chips)
app.component('Column', Column)
app.component('ConfirmDialog', ConfirmDialog)
app.component('ConfirmPopup', ConfirmPopup)
app.component('DataTable', DataTable)
app.component('DataView', DataView)
app.component('Dialog', Dialog)
app.component('Divider', Divider)
app.component('Dropdown', Dropdown)
app.component('Editor', Editor)
app.component('FileUpload', FileUpload)
app.component('Galleria', Galleria)
app.component('Image', Image)
app.component('InlineMessage', InlineMessage)
app.component('Inplace', Inplace)
app.component('InputNumber', InputNumber)
app.component('InputSwitch', InputSwitch)
app.component('InputText', InputText)
app.component('Knob', Knob)
app.component('Message', Message)
app.component('MultiSelect', MultiSelect)
app.component('OverlayPanel', OverlayPanel)
app.component('Paginator', Paginator)
app.component('Password', Password)
app.component('ProgressBar', ProgressBar)
app.component('ProgressSpinner', ProgressSpinner)
app.component('RadioButton', RadioButton)
app.component('Rating', Rating)
app.component('SelectButton', SelectButton)
app.component('ScrollPanel', ScrollPanel)
app.component('ScrollTop', ScrollTop)
app.component('Slider', Slider)
app.component('Skeleton', Skeleton)
app.component('Steps', Steps)
app.component('Tag', Tag)
app.component('Textarea', Textarea)
app.component('Toast', Toast)
app.component('Toolbar', Toolbar)
app.component('ToggleButton', ToggleButton)
app.component('TriStateCheckbox', TriStateCheckbox)

// My Custom Components goes here
app.component('BaseTextInput', BaseTextInput)
app.component('BaseTextarea', BaseTextarea)
app.component('BaseCalendarInput', BaseCalendarInput)
app.component('BaseDropdown', BaseDropdown)
app.component('BaseEditor', BaseEditor)
app.component('BaseNumberInput', BaseNumberInput)
app.component('BaseRating', BaseRating)
app.component('BaseSelectionInput', BaseSelectionInput)

app.component('CustomTable', CustomTable)
app.component('FormDialog', FormDialog)
app.component('DataTypeTag', DataTypeTag)
app.component('LanguageSelection', LanguageSelection)

// Custom Questions
app.component('CustomQuestion', CustomQuestion)

// FONT awesome
app.component('FontAwesomeIcon', FontAwesomeIcon)
app.component('FontAwesomeLayers', FontAwesomeLayers)
app.component('FontAwesomeLayersText', FontAwesomeLayersText)

// Custom Event configuration
app.config.globalProperties.$showToast = function ({ severity, summary, message }) {
  const toast = {
    severity: severity,
    summary: summary,
    detail: message,
    life: 5000
  }
  this.$toast.add(toast)
}

//=============> Custom Event Bus listener added
EventBus.on('show-toast', (res) => {
  app.config.globalProperties.$showToast({
    severity: res.severity,
    summary: res.summary,
    message: res.message
  })
})

// custom global states

app.config.globalProperties.appState = reactive({ lang: 'english' })
app.provide('appState', app.config.globalProperties.appState)

app.mount('#app')
