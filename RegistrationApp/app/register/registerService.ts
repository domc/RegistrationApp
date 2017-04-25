interface IApplicant extends ng.resource.IResource<IApplicant> {
    Name: string,
    LastName: string,
    Address: string,
    DateOfBirth: Date
}
interface IApplicantResource extends ng.resource.IResourceClass<IApplicant> {
}

RegisterApp
    .factory('Register', ['$resource', ($resource: ng.resource.IResourceService): IApplicantResource => {
        // Return the resource,
        return <IApplicantResource>$resource('/api/Register/');
    }])