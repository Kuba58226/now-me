import FormField from '../../molecules/FormField/FormField';
import SelectField from '../../molecules/SelectField/SelectField';
import { Wrapper, Button, TableWrapper, Header, MainWrapper, EmployeesTable, PaginationWrapper } from './EmployeesList.style';
import Employee from '../../molecules/Employee/Employee';
import Pagination from '../../molecules/Pagination/Pagination';
import useSpecialistForm from '../../../hooks/useSpecialistForm';

const EmployeesList = () => {
  const { handleSubmit, handleDelete, handleInputChange, paginate, currentEmployees, postsPerPage, cabinets, employees, formValues } = useSpecialistForm();

  return (
    <MainWrapper>
      <Wrapper as="form" onSubmit={handleSubmit}>
        <FormField label="Name" id="firstName" name="firstName" value={formValues.firstName} onChange={handleInputChange} />
        <FormField label="Last Name" id="lastName" name="lastName" value={formValues.lastName} onChange={handleInputChange} />
        <FormField label="Profession" id="profession" name="profession" value={formValues.profession} onChange={handleInputChange} />
        <SelectField label="Cabinets" id="cabinet_id" name="cabinet_id" value={formValues.cabinet_id} onChange={handleInputChange} tab={cabinets} type="cabinets" />
        <Button type="submit">Add</Button>
      </Wrapper>
      <TableWrapper>
        <Header>List of Specialist</Header>
      </TableWrapper>
      <EmployeesTable>
        <Employee employees={currentEmployees} handleDelete={handleDelete} />
      </EmployeesTable>
      <PaginationWrapper>
        <Pagination postsPerPage={postsPerPage} totalPosts={employees.length} paginate={paginate} />
      </PaginationWrapper>
    </MainWrapper>
  );
};

export default EmployeesList;
