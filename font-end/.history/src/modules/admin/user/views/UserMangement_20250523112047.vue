<script lang="ts">
import { ref, onMounted } from 'vue'
import AddUserModal from './modal_clients/AddUserModal.vue'
import EditUserModal from './modal_clients/EditUserModal.vue'
import GroupFormModal from "../components/Group_permission/Group_permission.vue"
import { Permission, GroupData, User } from "../entities/user.entity"

export default {
  components: {
    AddUserModal,
    EditUserModal,
    GroupFormModal
  },
  setup() {
    const isModalOpen = ref(false)
    const isEditModalOpen = ref(false)
    const selectedUser = ref<User | null>(null)
    const showModal = ref(false)
    const isEditMode = ref(false)
    const selectedGroup = ref<GroupData | null>(null)
    const allPermissions = ref<Permission[]>([])
    const users = ref<User[]>([
      {
        id: 1,
        avatar: 'https://i.pravatar.cc/150?img=1',
        code_student: 'STU001',
        username: 'somboun123',
        email: 'somboun@gmail.com',
        firstname: 'ສົມບູນ',
        birthday: '2000-01-15',
        address: 'ເມືອງໄຊເສດຖາ, ແຂວງວຽງຈັນ',
        department: 'ວິທະຍາສາດຄອມພິວເຕີ',
        phone: '020 12345678',
        is_staff: true,
        is_active: true,
        is_superuser: false,
        is_verify: true,
      },
      {
        id: 2,
        avatar: 'https://i.pravatar.cc/150?img=2',
        code_student: 'STU002',
        username: 'mani_lao',
        email: 'mani@email.com',
        firstname: 'ມານີ',
        birthday: '1999-12-10',
        address: 'ເມືອງສີສັດຕະນາກ, ແຂວງວຽງຈັນ',
        department: 'ບັນຊີ',
        phone: '020 98765432',
        is_staff: false,
        is_active: true,
        is_superuser: false,
        is_verify: true,
      },
      {
        id: 3,
        avatar: 'https://i.pravatar.cc/150?img=3',
        code_student: 'STU003',
        username: 'nith_lao',
        email: 'nith@example.com',
        firstname: 'ນິດ',
        birthday: '2001-05-21',
        address: 'ເມືອງຈັນທະບູລີ, ແຂວງວຽງຈັນ',
        department: 'ພາສາອັງກິດ',
        phone: '020 56789012',
        is_staff: false,
        is_active: true,
        is_superuser: false,
        is_verify: false,
      },
      {
        id: 4,
        avatar: 'https://i.pravatar.cc/150?img=4',
        code_student: 'STU004',
        username: 'khamphou',
        email: 'khamphou@example.com',
        firstname: 'ຄໍາພູ',
        birthday: '1998-08-08',
        address: 'ເມືອງໄຊທານີ, ແຂວງວຽງຈັນ',
        department: 'ນິເທດ',
        phone: '020 22334455',
        is_staff: true,
        is_active: false,
        is_superuser: false,
        is_verify: false,
      },
      {
        id: 5,
        avatar: 'https://i.pravatar.cc/150?img=5',
        code_student: 'STU005',
        username: 'vilay_dev',
        email: 'vilay.dev@gmail.com',
        firstname: 'ວິໄລ',
        birthday: '1997-03-03',
        address: 'ເມືອງປາກງື່ມ, ແຂວງວຽງຈັນ',
        department: 'ໄຟຟ້າ',
        phone: '020 33445566',
        is_staff: false,
        is_active: true,
        is_superuser: false,
        is_verify: true,
      },
      {
        id: 6,
        avatar: 'https://i.pravatar.cc/150?img=6',
        code_student: 'STU006',
        username: 'keo_sisavat',
        email: 'keo@gmail.com',
        firstname: 'ແກ້ວ',
        birthday: '2002-11-11',
        address: 'ເມືອງຫາດຊາຍຟອງ, ແຂວງຈໍາປາສັກ',
        department: 'ສຶກສາພື້ນຖານ',
        phone: '020 11223344',
        is_staff: true,
        is_active: true,
        is_superuser: true,
        is_verify: true,
      },
    ])

    const openAddUser = () => {
      selectedUser.value = {
       id: 0, // or some default value
  avatar: '',
  code_student: '',
  username: '',
  email: '',
  firstname: '',
  birthday: '',
  address: '',
  department: '',
  phone: '',
  is_staff: false,
  is_active: false,
  is_superuser: false,
  is_verify: false,
      }
      isModalOpen.value = true
    }

    const openEditUser = (user: User) => {
      selectedUser.value = { ...user }
      isModalOpen.value = true
    }

    const saveUser = (userData: User) => {
      const index = users.value.findIndex(u => u.code_student === userData.code_student)
      if (index !== -1) {
        users.value[index] = userData
      } else {
        users.value.push(userData)
      }
      isModalOpen.value = false
    }

    const selectUser = (user: User) => {
      selectedUser.value = user
    }

    const openEditModal = () => {
      if (!selectedUser.value) {
        globalThis.alert('Please select a user before editing.');
        return
      }
      isEditModalOpen.value = true
    }

    const deleteUser = () => {
      if (!selectedUser.value) return;
      const confirmed = confirm("Are you sure you want to delete this user?");
      if (confirmed) {
        users.value = users.value.filter((u) => u.id !== selectedUser.value.id);
        selectedUser.value = null;
      }
    }

    const fetchPermissions = async () => {
      allPermissions.value = [
        { id: 1, name: 'Can add user' },
        { id: 2, name: 'Can change user' },
        { id: 3, name: 'Can delete user' },
        { id: 4, name: 'Can view user' }
      ]
    }

    const openModal = () => {
      selectedGroup.value = { name: '', permissions: [] }
      isEditMode.value = false
      showModal.value = true
    }

    const handleFormSubmit = (groupData: GroupData) => {
      console.log('Group submitted:', groupData)
      showModal.value = false
    }

    onMounted(() => {
      fetchPermissions()
    })

    return {
      isModalOpen,
      isEditModalOpen,
      selectedUser,
      showModal,
      isEditMode,
      selectedGroup,
      allPermissions,
      users,
      openAddUser,
      openEditUser,
      saveUser,
      selectUser,
      openEditModal,
      deleteUser,
      openModal,
      handleFormSubmit
    }
  }
}
</script>

