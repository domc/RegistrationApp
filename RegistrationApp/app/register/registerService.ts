module registerService {

    export interface IApplicant extends ng.resource.IResource<IApplicant> {
        Name: string,
        LastName: string,
        Address: string,
        DateOfBirth: Date
    }
    export interface IApplicantResource extends ng.resource.IResourceClass<IApplicant> {
    }   

    RegisterApp
        .factory('Register', ['$resource', ($resource: ng.resource.IResourceService): IApplicantResource => {
            // Return the resource,
            return <IApplicantResource>$resource('/api/Register/');
        }])
}