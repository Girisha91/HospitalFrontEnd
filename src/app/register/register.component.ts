import { Component , OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService,DoctorTypeService,
        DoctorService,UtilService,
        RoleService } from '../_services/index';
import { DoctorType, DoctorDTO , Role } from '../_models/index';



@Component({
    moduleId: module.id,
    selector: 'register',
    templateUrl: 'register.component.html',
    styleUrls: ['register.component.css']
})


export class RegisterComponent implements OnInit{

    private loading:boolean = false;
    private image: String;
    private allDoctorType :Array<DoctorType>;
    //private roles: Array<Role> = [];
    private newDocterType: any = {} ;
    private newDoctor: DoctorDTO;
    // dropdown list
    private dropdownList: any = [ 
        {"id":1,"itemName":"ADMIN"},
        {"id":2,"itemName":"USER"},
        {"id":3,"itemName":"DBA"} ];

    private dropdownSettings: any = { 
        singleSelection: false,
        text:"Select Role's",
        selectAllText:'Select All',
        unSelectAllText:'UnSelect All',
        enableSearchFilter: true,
        classes:"myclass custom-class"
    };


    constructor(private router: Router, private doctorTypeService: DoctorTypeService, private alertService: AlertService,
        private doctorService:DoctorService, private utilService:UtilService, private roleService: RoleService) {}

    public ngOnInit(){
        
        this.image = this.utilService.getCircalImage();
        this.loadAllDoctorType();
        this.newDoctor = {
            email: '', username:  '', password: '', firstname: '', lastname: '',
            gender: true, active: true, roles: [] , doctorType: 2
        }
    }
    
    private registerDoctor(newDocter: DoctorDTO, isValid: boolean) {
        // call API to save customer
        this.loading = true;
        this.doctorService.create(this.newDoctor)
            .subscribe( data => {
                console.log(data);
                this.alertService.success('Registration successful', true);
                this.router.navigate(['/home']);
            },error => {        
                this.alertService.error("User Name Already Taken");
                this.loading = false;
            });
    }


    private loadAllDoctorType() { 
         this.doctorTypeService.getAllDoctorType().
           subscribe(allDoctorType => { 
             this.allDoctorType = allDoctorType.filter((item:any) => { return  !"ALL".match(item.type) ; });
            }, error => {}); 
    }

    public registerDoctorType(){
        console.log("Event press");   
        console.log(this.newDocterType.dtype);
        this.doctorTypeService.createNewDoctorType(this.newDocterType.dtype)
            .subscribe( data => {
                 this.alertService.success('Successful New Type');
            }, error => {
                 this.alertService.error('Already Type Exist');
            });
    }

    
    public show:boolean = true; 
    public showhide(){
        if(this.show){
            this.show = false;
        }else{
            this.show = true;
        }
    }

}
